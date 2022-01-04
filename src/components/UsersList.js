import classes from './UsersList.module.scss';
import sprite from '../assets/sprite.svg';
import { Link } from 'react-router-dom';
import Loading from '../components/UI/Loading';

const UsersList = props => {

    const { users, isLoading, onDeleteUser, loggedUserId } = props;

    const getRoleStyle = (role) => {
        switch (role) {
            case 'Admin':
                return classes['usersList__role--admin'];
            case 'Editor':
                return classes['usersList__role--editor'];
            case 'User':
                return classes['usersList__role--user'];
            default:
                return classes['usersList__role--user'];
        }
    };

    return (
        <div className={classes.usersList}>
            {isLoading && <Loading />}

            {
                !isLoading &&
                <table className={classes.usersList__table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/admin/edit-user/${user.id}`}>
                                        <svg className={`${classes.usersList__icon} ${classes['usersList__icon--edit']}`}>
                                            <use href={sprite + '#icon-edit'}></use>
                                        </svg>
                                    </Link>
                                </td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <p className={`${classes.usersList__role} ${getRoleStyle(user.role)}`}>{user.role}</p>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {loggedUserId !== user.id &&
                                        <button className={classes.usersList__button} type='button' onClick={() => onDeleteUser(user)}>
                                            <svg className={`${classes.usersList__icon} ${classes['usersList__icon--delete']}`}>
                                                <use href={sprite + '#icon-remove-user'}></use>
                                            </svg>
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            }
        </div>

    );
};

export default UsersList;