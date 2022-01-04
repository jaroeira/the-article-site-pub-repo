import Compressor from 'compressorjs';

const imageCompressor = (imageFile) => {

    if (!imageFile) return;

    const promise = new Promise((resolve, reject) => {
        new Compressor(imageFile, {
            quality: 0.7,
            maxWidth: 500,
            success(result) {
                resolve(result);
            },
            error(err) {
                console.log(err.message);
                reject(err);
            }
        });
    });

    return promise;
};

export default imageCompressor;