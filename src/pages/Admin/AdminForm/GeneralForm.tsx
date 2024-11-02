export const GeneralForm = () => {
  return <div></div>;
};

// import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
// import styles from './Form.module.scss';
// import { getNormalized } from '../../../utils/getNormalized';
// import { TextInput } from './components/Inputs/TextInput';
// import { DateInput } from './components/Inputs/DateInput';
// import { TextAreaInput } from './components/Inputs/TextAreaInput';
// import { ImageInput } from './components/Inputs/ImageInput';
// import classNames from 'classnames';
// import { useSessionStorage } from '../../../hooks/useSessionStorage';
// import { FormContext } from '../../../context/FormContext';
// import { newsSlice } from '../../../features/newsSlice';
// import { useAppDispatch } from '../../../app/hooks';
// import { title } from 'process';
// import { getUniqueId } from '../../../utils/formUtils';
// import { NewsTypes } from '../../../types/News';
// import { adminNews } from '../../../services/admin/adminNews';
// import { Loader } from '../../../components/Loader';
// import { checkAdminFormField } from '../../../utils/checkFormFields';

// type initialFormState = {
//   title: string;
//   publicationDate: Date;
//   image: null | File | string;
//   text: string;
//   type: string;
// };

// type ValidationErrors<T> = {
//   [K in keyof T]?: string | null;
// };

// type Props = {
//   defaultValue: {
//     [key: string]: string | null
//   }
// }

// export const GeneralForm: React.FC<Props> = ({defaultValue }) => {
//   const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
//   const [errors, setErrors] = useState<ValidationErrors<initialFormState>>();
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const dispatch = useAppDispatch();

//   return (<div></div>);
//   const [formField, setFormField] = useState<initialFormState>(defaultValue);
//   const updateInput = (fieldTitle: string) => {
//     return (newValue: string | File | null | Date) => {
//       setFormField(prevValue => ({ ...prevValue, [fieldTitle]: newValue }));
//     };
//   };

//   useEffect(() => {
//     setFormField(defaultValue);
//   }, [selectedItem]);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors(checkAdminFormField(formField));

//     // if (checkAdminFormField(formField)) {
//     //   return;
//     // }

//     const formData = new FormData();
//     const restdata = {
//       title: formField.title,
//       text: formField.text,
//       type: formField.type,
//       publicationDate: formField.publicationDate.toISOString(),
//     };

//     formData.append(
//       'requestDto',
//       new Blob([JSON.stringify(restdata)], { type: 'application/json' }),
//     );

//     if (formField.image) {
//       formData.append('image', formField.image);
//     }

//     if (selectedItem) {
//       adminNews
//         .update(selectedItem.id, formData, token)
//         .then(() => {
//           newsSlice.actions.updateNewsArticle({
//             ...formField,
//             publicationDate: formField.publicationDate.toISOString(),
//             image: '',
//             type: formField.type as NewsTypes,
//             id: selectedItem.id,
//             link: getNormalized.link(title),
//           });

//           clearForm();
//         })
//         .catch(err => {
//           console.error(err);
//           console.log(formField);
//           setFormError('Something went wrong! Try again later!');
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       console.log(formData);

//       adminNews
//         .post(formData, token)
//         .then(() => {
//           dispatch(
//             newsSlice.actions.addNewsArticle({
//               ...formField,
//               publicationDate: formField.publicationDate.toISOString(),
//               image: '',
//               type: formField.type as NewsTypes,
//               id: getUniqueId(),
//               link: getNormalized.link(title),
//             }),
//           );
//           clearForm();
//         })
//         .catch(err => {
//           console.log(err);
//           setFormError('Something went wrong! Try again later!');
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   function clearForm() {
//     setFormField({
//       title: '',
//       publicationDate: new Date(),
//       image: null,
//       text: '',
//       type: 'news',
//     });
//   }

//   return (
//     <section
//       className={classNames(styles.container, {
//         [styles.container__show]: displayForm,
//       })}
//     >
//       <div
//         className={`${styles.backButton} button--transparent`}
//         onClick={() => setDisplayForm(false)}
//       >
//         <div
//           className={`${styles.backButton__icon} icon icon--arrow icon--small`}
//         ></div>
//         <p>Back</p>
//       </div>
//       <form
//         className={`${styles.form} form`}
//         autoComplete="off"
//         noValidate
//         onSubmit={handleSubmit}
//       >
//         <TextInput
//           fieldTitle="Title"
//           fieldValue={formField.title}
//           fieldError={errors?.title || ''}
//           placeHolder="Please enter title"
//           updateInput={updateInput('title')}
//         />

//         <DateInput
//           dateValue={getNormalized.dateForAdmin(formField.publicationDate)}
//           updateDate={updateDate}
//         />

//         <label htmlFor="" className={styles.label}>
//           Choose a type:
//         </label>
//         <div className={styles.types}>
//           {['EVENT', 'NEWS', 'REPORT'].map(type => {
//             return (
//               <div
//                 className={classNames(styles.type, {
//                   [styles.type__selected]:
//                     formField.type.toUpperCase() === type.toUpperCase(),
//                 })}
//                 onClick={() => updateInput('type')(type.toUpperCase())}
//               >
//                 {type}
//               </div>
//             );
//           })}
//         </div>

//         <ImageInput
//           defaultImage={formField.image}
//           updateInput={updateInput('image')}
//         />
//         <TextAreaInput
//           fieldValue={formField.text}
//           fieldError={errors?.text || ''}
//           placeHolder={'Type the text of the news article...'}
//           updateInput={updateInput('text')}
//         />
//         {formError && <p className="formField__notValid--text">{formError}</p>}
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className={styles.buttons}>
//             <button
//               type="submit"
//               className={`form__button button--yellow button--secondary`}
//             >
//               SAVE
//             </button>

//             <button
//               className={`form__button button--transparent button--secondary`}
//               onClick={() => clearForm()}
//             >
//               RESET
//             </button>
//           </div>
//         )}
//       </form>
//     </section>
//   );
// };
