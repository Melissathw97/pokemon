import styles from '../../../styles/pokemonNew.module.scss';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import { iErrorMessage } from './types';

const ErrorMessage = ({ fieldName }: iErrorMessage) => {
    return (
        <p className={styles.errorMessage}>
            <FormikErrorMessage name={fieldName} />
        </p>
    )
}

export default ErrorMessage;