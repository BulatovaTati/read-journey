import Select, { SingleValue } from 'react-select';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/books/selectors';
import { saveFilter } from '../../redux/books/slice';
import { fetchOwnBooks } from '../../redux/books/operations';

import { customStyles } from './customStyles';
import s from './CustomSelect.module.css';
import { FilterOption } from '../../redux/books/books-types';

const options: FilterOption[] = [
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: '', label: 'All books' },
];

const CustomSelect = () => {
  const dispatch = useAppDispatch();
  const filter = useSelector(selectFilter);
  const selectedOption = options.find(option => option.value === filter.value) || options[3];

  const handleChange = (selectedOption: SingleValue<FilterOption>) => {
    if (!selectedOption) return;
    dispatch(saveFilter(selectedOption));
    dispatch(fetchOwnBooks(selectedOption.value));
  };

  return (
    <div className={s.selectWrapper}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        classNamePrefix="custom-select"
        isSearchable={false}
      />
    </div>
  );
};

export default CustomSelect;
