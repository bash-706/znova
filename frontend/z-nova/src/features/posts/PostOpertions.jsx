import Operations from '../../ui/Operations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import { usePostCategories } from '../postCategories/usePostCategories';
import { categoriesToOptions } from '../../utils/multiSelectTagUtils';

function PostOperations() {
  const { postCategories } = usePostCategories();

  return (
    <Operations>
      <Filter
        filterField="category"
        options={categoriesToOptions(postCategories)}
      />

      <SortBy
        filterField="sort"
        options={[
          { value: 'createdAt-desc', label: 'Sort by date ( new first )' },
          { value: 'createdAt-asc', label: 'Sort by date ( old first )' },
        ]}
      />
    </Operations>
  );
}

export default PostOperations;
