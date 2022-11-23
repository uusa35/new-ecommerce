import BackendContainer from '../components/containers/BackendContainer';

export default function ({brand}) {
    return (
        <BackendContainer>
            <h1>edit {brand.id}</h1>
        </BackendContainer>
    );
}
