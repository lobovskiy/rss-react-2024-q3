import './FormPage.css';

interface Props {
  Form: React.FC;
}

const FormPage: React.FC<Props> = ({ Form }) => {
  return (
    <main className="form-main">
      <h3 className="form-title">Fill out the form</h3>
      <Form />
    </main>
  );
};

export default FormPage;
