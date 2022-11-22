import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { FormStyle, LabelStyle, InputStyle, ButtonStyle } from './Form.styled';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { Formik } from 'formik';

export function FormInput() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const id = 'id-' + nanoid(4);
    const { name, number } = values;

    if (contacts.find(contact => contact.name === name)) {
      Notify.warning(`${name} is already in contacts`);
      return false;
    }

    // dispatch(addContact({ id, name, number }));
    resetForm();
  };

  return (
    <Formik initialValues={{ name: '', number: '' }} onSubmit={handleSubmit}>
      <FormStyle>
        <LabelStyle>
          Name
          <InputStyle
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </LabelStyle>
        <LabelStyle>
          Number
          <InputStyle
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </LabelStyle>
        <ButtonStyle type="submit">Add contact</ButtonStyle>
      </FormStyle>
    </Formik>
  );
}
