import { WORDS_MODE } from 'constants/names.storage';
import { useLocalStorage } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
	Loader
} from 'semantic-ui-react';
import { WordMode } from 'types/types';
import styles from '../Auth.module.scss';
import { useAuthForm } from '../useAuthForm';

export const SignIn = () => {
	const {
		handleSubmit,
		email,
		handleEmail,
		password,
		handlePassword,
		errorMessage,
		isLoadingPostForm,
		isLoggedIn,
	} = useAuthForm('signIn');

	const router = useRouter();
	const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'commonWords');

	React.useEffect(() => {
		if (isLoggedIn) router.replace(wordsMode == "commonWords" ? "/common-words" : '/user-words');
	}, [isLoggedIn]);

	if (isLoggedIn) return <Loader size='massive' active inline='centered' />;

	return (
		<Grid textAlign="center" className={styles.wrapper} verticalAlign="middle">
			<Grid.Column className={styles.form}>
				<Header as="h1" color="teal" textAlign="center">
					Sign in
				</Header>
				<Form error size="large" onSubmit={handleSubmit}>
					<Segment >
						<Form.Input
							size='huge'
							value={email}
							onChange={handleEmail}
							name="email"
							fluid
							icon="mail"
							iconPosition="left"
							placeholder="E-mail address"
						/>
						<Form.Input
							size='huge'
							fluid
							value={password}
							onChange={handlePassword}
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
						/>

						{errorMessage &&
							<Message
								error
								header={errorMessage}

							/>
						}

						<Button loading={isLoadingPostForm} color="teal" fluid size="huge">
							Sign In
						</Button>
					</Segment>
				</Form>
				<Segment className={styles.additionalAction}>
					Or you can <Link href="/auth/sign-up"><strong><a>Sign Up</a></strong></Link>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};