import { useState } from 'react';
import { AUTHOR_NAMES, UPDATE_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';
import Select from 'react-select';

const AuthorForm = ({ names }) => {
	const [name, setName] = useState(null);
	const [year, setYear] = useState('');

	let options = names.data.allAuthors.map((name) => {
		return { value: name.name, label: name.name };
	});

	const [addYear] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }, { query: AUTHOR_NAMES }],
	});

	const submit = (event) => {
		event.preventDefault();

		addYear({
			variables: { name: name.value, setBornTo: year },
		});

		setName('');
		setYear('');
	};

	return (
		<>
			<h2>Add Birth Year</h2>
			<form onSubmit={submit}>
				<div>
					<Select
						defaultValue={options[0]}
						onChange={setName}
						options={options}
					/>
				</div>
				<div>
					Year
					<input
						type='number'
						value={year}
						onChange={({ target }) => setYear(+target.value)}
					/>
				</div>
				<button type='submit'>Update Author</button>
			</form>
		</>
	);
};

export default AuthorForm;
