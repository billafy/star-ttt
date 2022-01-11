import './styles/loading.scss';

const Loading = () => {
	return (
		<div className='loading'>
			<div className='spinner'></div>
			<p>Waiting for other player...</p>
		</div>	
	);
};

export default Loading;
