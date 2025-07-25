import s from './RecommendedBooksList.module.css';

const RecommendedBooksList = ({ results }) => {
  return (
    <ul className={s.list}>
      {results?.slice(0, 3).map(book => (
        <li className={s.item} key={book._id}>
          <img src={book.imageUrl} alt={book.title} className={s.image} />
          <p className={s.title}>{book.title}</p>
          <p className={s.author}>{book.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default RecommendedBooksList;
