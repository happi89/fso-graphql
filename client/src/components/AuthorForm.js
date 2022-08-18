import { useState } from 'react';
import { AUTHOR_NAMES, UPDATE_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';
import Select from 'react-select';

const AuthorForm = ({ names }) => {
	const [name, setName] = useState('Robert Martin');
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
			<h2 class='text-lg font-bold m-1'>Add Birth Year</h2>
			<form onSubmit={submit}>
				<div>
					<Select
						class='select select-bordered w-full max-w-xs'
						onChange={setName}
						options={options}
					/>
				</div>
				<div>
					<label class='label'>
						<span class='label-text'>Year</span>
					</label>
					<input
						type='number'
						value={year}
						onChange={({ target }) => setYear(+target.value)}
						class='input input-bordered w-full max-w-xs mb-2'
					/>
				</div>
				<button class='btn btn-primary btn-wide' type='submit'>
					Update Author
				</button>
			</form>
		</>
	);
};

export default AuthorForm;
