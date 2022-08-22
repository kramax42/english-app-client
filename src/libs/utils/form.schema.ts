import * as yup from 'yup';

// Made definitions and translations array of objects
// instead of array of string to avoid react-hook-form errors.
export const wordValidationSchema = yup.object({
	word: yup
		.string()
		.required('Word is required')
		.min(2, 'Word should be of minimum 2 characters length'),
	transcription: yup
		.string(),
		// .required('Transcription is required'),
		// .min(2, 'Transcription should be of minimum 2 characters length'),
	definitions: yup
		.array()
		.of(
			yup.object().shape({
				tdefinition: yup.string(),
			})
		)
		.required('definitions required'),
	translations: yup
		.array()
		.of(
			yup.object().shape({
				translation: yup.string(),
			})
		)
		.required('Translations required'),
	studyStatus: yup
		.string()
		.required(),
	usageExamples: yup
		.array()
		.of(
			yup.object().shape({
				sentence: yup.string(),
				translation: yup.string(),
			})
		)
		.required('Usage examples required'),
});