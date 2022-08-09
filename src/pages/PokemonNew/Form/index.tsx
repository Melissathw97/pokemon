import * as Yup from 'yup';
import ErrorMessage from '../ErrorMessage';
import { FormikProps, withFormik } from 'formik';
import styles from '../../../styles/pokemonNew.module.scss';
import { iPokemonStat, iFormProps, iFormValues, PokemonAttr } from './types';

const InnerForm = (props: FormikProps<iFormValues>) => {
    const {
        values,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting
    } = props;

    const statsInputs: PokemonAttr[] = ["hp", "attack", "defense", "speed"];
    const pokemonTypes = ["grass", "electric", "poison", "water", "flying"];

    const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setFieldValue("image", imageUrl);
        }
    }

    const onTypeSelect = (typeTitle: string) => {
        const newTypes = [...values.types];

        if (values.types.includes(typeTitle)) {
            const typeIndex = values.types.findIndex((type) => type === typeTitle)
            newTypes.splice(typeIndex, 1);
        } else {
            newTypes.push(typeTitle);
        }

        setFieldValue("types", newTypes);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <label htmlFor='name'>
                    Pokemon Picture
                </label>
                <div>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={onImageUpload}
                        multiple={false}
                    />
                    {
                        values.image && (
                            <img
                                alt="Pokemon"
                                src={values.image}
                                className={styles.imagePreview}
                            />
                        )
                    }
                    <ErrorMessage fieldName='image' />
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <label htmlFor='name'>
                    Pokemon Name
                </label>
                <div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                    />
                    <ErrorMessage fieldName='name' />
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <label htmlFor='type'>
                    Pokemon Type
                </label>
                <div>
                    <div className={styles.typesWrapper}>
                        {pokemonTypes.map((typeTitle) => (
                            <button
                                type="button"
                                key={typeTitle}
                                className={values.types.includes(typeTitle) ? styles.selectedTypeButton : styles.typeButton}
                                onClick={() => onTypeSelect(typeTitle)}
                            >
                                {typeTitle}
                            </button>
                        ))}
                    </div>
                    <ErrorMessage fieldName='types' />
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <label>
                    Pokemon Stats
                </label>
                <div className={styles.statsWrapper}>
                    {statsInputs.map((statsTitle: PokemonAttr) => (
                        <div key={statsTitle} className={styles.statsInput}>
                            <input
                                id="stats"
                                type="range"
                                value={values[statsTitle]}
                                min="0" max="100"
                                onChange={({ target: { value } }) => setFieldValue(statsTitle, parseInt(value))}
                            />
                            <label htmlFor='stats'>
                                {statsTitle}: {values[statsTitle]}
                            </label>
                            <ErrorMessage fieldName={statsTitle} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <label htmlFor="abilities">
                    Pokemon Abilities
                </label>
                <div>
                    <input
                        type="text"
                        id="abilities"
                        name="abilities"
                        value={values.abilities}
                        onChange={handleChange}
                    />
                    <p>
                        <small>Separate abilities by a comma ","</small>
                    </p>
                    <ErrorMessage fieldName="abilities" />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {
                    isSubmitting ? "Working our magic..." : "Create Pokemon"
                }
            </button>
        </form>
    );
};

const NewPokemonForm = withFormik<iFormProps, iFormValues>({
    mapPropsToValues: props => ({
        image: props.initialImage || "",
        name: props.initialName || "",
        types: props.initialTypes || [],
        hp: props.initialHp || 0,
        attack: props.initialAttack || 0,
        defense: props.initialDefense || 0,
        speed: props.initialSpeed || 0,
        abilities: props.initialAbilities || ""
    }),

    validationSchema: Yup.object().shape({
        image: Yup.string()
            .required("Image is required"),
        name: Yup.string()
            .required("Name is required"),
        types: Yup.array()
            .min(1, "Types are required"),
        hp: Yup.number()
            .min(1, "HP is required"),
        attack: Yup.number()
            .min(1, "Attack is required"),
        defense: Yup.number()
            .min(1, "Defense is required"),
        speed: Yup.number()
            .min(1, "Speed is required"),
        abilities: Yup.string()
            .required("Abilities are required")
    }),

    handleSubmit(
        { image, name, types, hp, attack, defense, speed, abilities }: iFormValues,
        { setSubmitting, props: { pokemonStore }, resetForm, setErrors }
    ) {
        setSubmitting(true);

        const stats: iPokemonStat[] = [
            { name: "hp", baseStat: hp },
            { name: "attack", baseStat: attack },
            { name: "defense", baseStat: defense },
            { name: "speed", baseStat: speed }
        ];

        const pokemonExists = pokemonStore.allPokemon
            .some(({ name: pokemonName }) => pokemonName.toLowerCase() === name.toLowerCase())

        if (pokemonExists) {
            setErrors({ name: "A Pokemon with this name already exists" })
        } else {
            const abilitiesArray = abilities.trim().split(/,\s*/g);
            const newPokemon = { name, image, types, stats, abilities: abilitiesArray };

            localStorage.setItem("allPokemon", JSON.stringify([
                ...pokemonStore.allPokemon, newPokemon
            ]));

            pokemonStore.addPokemon(newPokemon);
            resetForm();
        }

        setSubmitting(false);
    }
})(InnerForm);

export default NewPokemonForm;