import './FormPage.css';

interface Props {
  Form: React.FC;
  formTitle: string;
}

const FormPage: React.FC<Props> = ({ Form, formTitle }) => {
  return (
    <main className="form-main">
      <h3 className="form-title">{`Fill out the ${formTitle} form`}</h3>
      <Form />
    </main>
  );
};

export default FormPage;
