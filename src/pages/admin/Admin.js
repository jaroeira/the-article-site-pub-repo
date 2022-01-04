import classes from './Admin.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import * as yup from 'yup';

//UI
import DashboardCard from '../../components/UI/DashboardCard';
import UsersList from '../../components/UsersList';
import Paginator from '../../components/UI/Paginator';
import { useToasts } from '../../components/UI/Toast/ToastProvider';
import Modal from '../../components/UI/Modal/Modal';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/auth-slice';
import { adminActions, getDocCounter, getUsers, deleteUser, adminSelector } from '../../store/admin-slice';

const Admin = props => {

    const { addToast } = useToasts();

    const [userFilter, setUserFilter] = useState({});
    const [selectedRole, setSelectedRole] = useState('All');
    const [filterEmail, setFilterEmail] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const dispatch = useDispatch();
    const { token, userId } = useSelector(authSelector);

    const {
        totalUsers,
        totalArticles,
        isFetchingDocsCounter,
        isFetchingUsers,
        isSuccess,
        didDeleteUser,
        isError,
        errorMessage,
        paginatedUsers } = useSelector(adminSelector);

    useEffect(() => {
        const clearAllFetchState = () => {
            dispatch(adminActions.clearFetchState());
        };

        clearAllFetchState();

        dispatch(getDocCounter(token));
        dispatch(getUsers({ token }));

        return () => clearAllFetchState();
    }, [dispatch, token]);

    //On deleteUser Success
    useEffect(() => {

        if (isSuccess && didDeleteUser) {
            addToast({ type: 'info', text: 'User successfully deleted', autoDismiss: true, autoDismissTimeout: 3000 });
            dispatch(adminActions.clearFetchState());
            dispatch(getDocCounter(token));
            dispatch(getUsers({ token }));
        }

    }, [dispatch, didDeleteUser, isSuccess, addToast, token]);

    //On error
    useEffect(() => {

        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }

    }, [isError, addToast, errorMessage]);

    //Pagination 

    const nextUserPageClickHandler = () => {
        if (paginatedUsers.hasNextPage) {
            dispatch(getUsers({ page: paginatedUsers.nextPage, token, query: userFilter }));
        }
    };

    const previousUserPageClickHandler = () => {
        if (paginatedUsers.hasPrevPage) {
            dispatch(getUsers({ page: paginatedUsers.prevPage, token, query: userFilter }));
        }
    };

    const userPageClickHandler = (page) => {
        dispatch(getUsers({ page, token, query: userFilter }));
    };

    //End Pagination

    const userFilterClickHandler = async () => {

        const emailSchema = yup.object().shape({ email: yup.string().email() });
        const isEmailValid = await emailSchema.isValid({ email: filterEmail });

        if (filterEmail !== '' && !isEmailValid) {
            addToast({ type: 'warning', text: 'invalid email', autoDismiss: true, autoDismissTimeout: 5000 });
        }

        let query = {};
        if (selectedRole !== 'All') query.role = selectedRole;
        if (filterEmail !== '' && isEmailValid) query.email = filterEmail;

        setUserFilter(query);

        dispatch(getUsers({ token, query: query }));
    };

    //delete user handlers

    const deleteUserHandler = () => {

        const userId = selectedUser.id;
        dispatch(deleteUser({ token, userId }));

        setSelectedUser(null);
        setOpenModal(false);
    };

    const confirmDeleteUserHandler = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const cancelDeleteHandler = () => {
        setSelectedUser(null);
        setOpenModal(false);
    };

    //end delete user handlers

    return (
        <div className={classes.admin}>

            <div className={classes.admin__cardsContainer}>
                <DashboardCard isLoading={isFetchingDocsCounter}
                    label='Total Articles'
                    value={totalArticles}
                    icon='icon-images'
                    lightColor='#4be2d9'
                    darkColor='#5c7de9' />
                <DashboardCard isLoading={isFetchingDocsCounter}
                    label='Total Users'
                    value={totalUsers}
                    icon='icon-users'
                    lightColor='#fbd941'
                    darkColor='#f78758' />
            </div>

            <div className={classes['admin__toolbar-container']}>
                <div className={classes['admin__filter-container']}>

                    <div className={classes['admin__filter-roles']}>
                        <select value={selectedRole} onChange={({ target: { value } }) => setSelectedRole(value)}>
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="User">User</option>
                        </select>
                    </div>


                    <input type='email'
                        placeholder='filter by email'
                        className={classes['admin__filter-email']}
                        value={filterEmail}
                        onChange={({ target: { value } }) => setFilterEmail(value)}
                    />


                    <svg className={`${classes.admin__icon} ${classes['admin__icon--filter']}`} onClick={userFilterClickHandler}>
                        <use href={sprite + '#icon-funnel'}></use>
                    </svg>

                </div>

                <Link to='/admin/create-user'>
                    <svg className={`${classes.admin__icon} ${classes['admin__icon--delete']}`}>
                        <use href={sprite + '#icon-add-user'}></use>
                    </svg>
                </Link >
            </div>

            <UsersList isLoading={isFetchingUsers} users={paginatedUsers.docs} loggedUserId={userId} onDeleteUser={confirmDeleteUserHandler} />

            <Modal isOpen={openModal}
                title='Are you sure?'
                onClose={cancelDeleteHandler}
                onConfirm={deleteUserHandler}>
                <p style={{ color: 'red' }}>Please confirm you want to delete the following user:</p>
                <p>Name: {selectedUser?.displayName}</p>
                <p>Email: {selectedUser?.email}</p>
                <p>Role: {selectedUser?.role}</p>
            </Modal>

            {paginatedUsers.totalPages > 1 &&
                <Paginator
                    totalPages={paginatedUsers.totalPages}
                    currentPage={paginatedUsers.page}
                    nextPageClicked={nextUserPageClickHandler}
                    previousPageClicked={previousUserPageClickHandler}
                    pageClicked={userPageClickHandler}
                />
            }


        </div>
    );
};

export default Admin;