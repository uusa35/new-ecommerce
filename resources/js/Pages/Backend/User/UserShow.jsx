import BackendContainer from '../components/containers/BackendContainer';

const UserShow = ({element}) => {
    return (
        <BackendContainer>
            <h1>User Show Id : {element.id}</h1>
        </BackendContainer>
    );
};

export default UserShow;
