import { h } from 'preact';
import { useHttpContext } from '../../components/HttpContext'
import {
	useState,
	useEffect
} from "preact/hooks"

const Home = () => {
	const {
		addInQueue,
		removeRequests
	} = useHttpContext()

	const [foo, setFoo] = useState()
	const [localRequests, setLocalRequests] = useState([])

	useEffect(() => {
		return () => removeRequests(localRequests)
	}, [])

	const addNewRequest = () => {
		const newId = Math.random().toString(36).substr(2, 9)
		setLocalRequests([...localRequests, newId])
		addInQueue({
			id: newId,
			url: 'my url',
			params: {
				method: 'GET'
			},
			onSuccess: result => {
				setFoo(result)
				// Faire des trucs ici
			}
		})
	}

	return (
		<div className="container">
			<h2>Home</h2>
			<p>This is the Home component.</p>
			<button onClick={addNewRequest}>Add request</button>
			<button onClick={() => {}}>remove request</button>
			<p>{foo}</p>
		</div>
	)
}

export default Home
