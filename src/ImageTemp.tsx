import imageExample from './assets/blue.png';

const Image = () => {
  return (
    <div style={{ border: '1px solid blue', width: 128, height: 128 }}>
      <img style={{position: 'relative', maxWidth: '100%' }} src={imageExample} alt="" />
    </div>
  );
};

export default Image;