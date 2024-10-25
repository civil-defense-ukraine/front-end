import React, { useEffect, useState } from 'react';
import styles from './Inputs.module.scss';

type Props = {
  defaultImage: File | null | string;
  updateInput: (newValue: File | null | string) => void;
};

async function linkToFile(url: string, fileName: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });

  return file;
}

export const ImageInput: React.FC<Props> = React.memo(
  ({ defaultImage, updateInput }) => {
    const [showImg, setShowImg] = useState(false);

    const setImagePreview = (img: File | null | string) => {
      const preview = document.getElementById('file-preview') as HTMLElement;
      if (typeof img === 'string') {
        preview.setAttribute('src', img);
        setShowImg(true);
      }

      if (img && typeof img !== 'string') {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onload = function () {
          if (typeof fileReader.result === 'string') {
            preview.setAttribute('src', fileReader.result);
            setShowImg(true);
          }
        };
      }

      setShowImg(false);
    };

    useEffect(() => {
      if (!defaultImage) {
        return;
      }

      if (typeof defaultImage === 'string') {
        linkToFile(defaultImage, 'imageName')
          .then(file => {
            setImagePreview(file);
          })
          .catch(err => {
            console.log(err);
          });
      }

      return () => {
        setShowImg(false);
      };
    }, [defaultImage]);

    return (
      <label htmlFor="image" className={styles.label}>
        Image
        <br />
        <div
          className={`${showImg ? styles.imageInput__active : styles.imageInput}`}
        >
          <img
            src="#"
            className={`${showImg ? styles.imageInput__img__active : styles.imageInput__img}`}
            alt="Preview Uploaded Image"
            id="file-preview"
          />
          <div
            onClick={e => {
              console.log(e.target);
              setImagePreview(null);
              updateInput(null);
            }}
          >
            <div
              className={`icon icon--small icon--close  ${styles.label__image__close}`}
            ></div>
          </div>
        </div>
        {!showImg && (
          <>
            <div className={`${styles.label__image} formField`}>
              <p className={styles.label__image__text}>Upload image</p>
              <div className="icon icon--small icon--upload"></div>
            </div>
            <input
              type="file"
              accept="image/*"
              className={`${styles.label__image__button}`}
              disabled={showImg}
              onChange={e => {
                if (e.target.files && e.target.files?.length >= 1) {
                  const img = e.target.files[0];
                  setImagePreview(img);
                  updateInput(img);
                }
              }}
              id="image"
              placeholder="Upload image"
            />
          </>
        )}
      </label>
    );
  },
);
