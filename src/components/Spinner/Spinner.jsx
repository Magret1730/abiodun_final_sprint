import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <FadeLoader
      color='#1e88e5'
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
