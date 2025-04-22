import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortOrder } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector((state) => state);

  const sortedBooks = [...books].sort((a, b) => {
    const valA = a[sortBy]?.toLowerCase() || '';
    const valB = b[sortBy]?.toLowerCase() || '';
    if (sortOrder === 'asc') return valA.localeCompare(valB);
    return valB.localeCompare(valA);
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <select onChange={(e) => dispatch(setSortBy(e.target.value))} value={sortBy}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <select onChange={(e) => dispatch(setSortOrder(e.target.value))} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.primary_isbn13}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksList;
