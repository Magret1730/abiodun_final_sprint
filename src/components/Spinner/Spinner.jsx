import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <FadeLoader
      color='#FF7043'
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
