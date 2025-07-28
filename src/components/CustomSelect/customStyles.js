export const customStyles = {
  control: base => ({
    ...base,
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    color: '#f9f9f9',
  }),
  menu: base => ({
    ...base,
    width: '120px',
    borderRadius: '12px',
    backgroundColor: '#262626',
    padding: '14px',
  }),
  singleValue: base => ({
    ...base,
    color: '#f9f9f9',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isSelected ? '#f9f9f9' : '#686868',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#f9f9f9',
      backgroundColor: 'transparent',
    },
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
};
