import Select from 'react-select';
import { useState } from 'react';
import { DELETE_BOOK, ALL_BOOKS } from '../../graphql';
import { useMutation } from '@apollo/client';

const DeleteBook = ({ books, showDelete, setShowDelete }) => {
	const [book, setBook] = useState('');

	const options = books.allBooks.map((book) => {
		return { value: book.title, label: book.title };
	});

	const [deleteBook] = useMutation(DELETE_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }],
	});

	const submit = (event) => {
		event.preventDefault();
		if (
			book !== '' &&
			window.confirm(`Are you sure you want to delete ${book.label}`)
		) {
			deleteBook({ variables: { title: book.label } });
		}
		setBook('');
	};

	return (
		<div>
			<h1 class='font-bold text-lg'>Delete Book</h1>
			<form onSubmit={submit}>
				<label class='label'>
					<span class='label-text'>Select Book</span>
				</label>
				<Select options={options} onChange={setBook} />
				<button type='submit' class='btn btn-wide btn-error mt-2'>
					Delete
				</button>
			</form>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a class='link text-center' onClick={() => setShowDelete(!showDelete)}>
				Filter By Genre
			</a>
		</div>
	);
};

export default DeleteBook;
