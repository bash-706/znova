import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };
  return <Select options={options} onChange={handleChange} />;
}

export default SortBy;
