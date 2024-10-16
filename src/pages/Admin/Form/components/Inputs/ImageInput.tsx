import { useState } from 'react';
import styles from './Inputs.module.scss';
type Props = {
  updateInput: (fieldName: string, newValue: File | null | string) => void;
};

export const ImageInput: React.FC<Props> = ({ updateInput }) => {
  const [showImg, setShowImg] = useState(false);

  const setImagePreview = (img: File | null) => {
    if (img) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      const preview = document.getElementById('file-preview') as HTMLElement;
      fileReader.onload = function () {
        if (typeof fileReader.result === 'string') {
          preview.setAttribute('src', fileReader.result);
          setShowImg(true);
        }
      };
    }

    setShowImg(false);
  };

  return (
    <label htmlFor="image" className={styles.label}>
      Image
      <br />
      <div
        className={`${showImg ? styles.imageInput__active : styles.imageInput}`}
        style={{
          height: !showImg ? '1px' : '60px',
          width: !showImg ? '1px' : '60px',
        }}
      >
        <img src="#" alt="Preview Uploaded Image" id="file-preview" />
        <div
          onClick={e => {
            console.log(e.target);
            setImagePreview(null);
            updateInput('image', null);
            updateInput('imageTitle', '');
          }}
        >
          {' '}
          <div
            className={`icon icon--small icon--close  ${styles.label__image__close}`}
          >
            {' '}
          </div>
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
                const title = e.target.files[0].name;
                setImagePreview(img);
                updateInput('image', img);
                updateInput('imageTitle', title);
              }
            }}
            id="image"
            placeholder="Upload image"
          />
        </>
      )}
    </label>
  );
};
