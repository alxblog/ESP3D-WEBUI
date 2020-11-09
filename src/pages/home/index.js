import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

//https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/

const Home = () => {
	const mockeServer = 'http://localhost:8888/api'
	const [requestList, setRequestList] = useState(['a0', 'a1', 'a2'])
	const [inc, setInc] = useState(0)

	function methodThatReturnsAPromise(id) {
		return fetch(`${mockeServer}?reqId=${id}`)
			.then(response => response.json())
			.then(json => console.log(JSON.stringify(json)))
	}

	useEffect(() => {
		if (requestList.length > 0) {
			let result = [...requestList].reduce((accumulatorPromise, nextID, i, array) => {
				setInc(nextID)
				console.log('nextID', nextID)
				console.log('i', i)
				return accumulatorPromise.then(() => {
					return methodThatReturnsAPromise(nextID);
				});
			}, Promise.resolve());

			result.then(e => {
				console.log("Resolution is complete!")
				setRequestList([])
			});
		}

	}, [requestList])


	const addRequest = () => {
		setRequestList([...requestList, 'a' + inc])
		console.log(`Request Nb ${inc} added`);
		setInc(inc + 1)
	}


	return (
		<div className="container">
			<h2>Home {JSON.stringify(requestList)} - {inc}</h2>
			<p>This is the Home component.</p>
			<button onClick={() => { addRequest() }}>Add Req</button>
		</div>
	)
}

export default Home
