import Catagories from '../components/Catagories';

export const CatagoriesLayout = ({ c }) => {
  return (
    <div className="text-center my-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">EDITOR’S PICK</h2>
      <p className="text-sm text-gray-500 mb-8">
        Problems trying to resolve the conflict between
      </p>
      <Catagories categories={c} />
    </div>
  );
};
