
import React from 'react'
import { signUp, signIn } from 'libs/auth.api';
import { useUser } from 'hooks';

type AuthMode = 'signIn' | 'signUp';

export const useAuthForm = (authMode: AuthMode) => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const { mutate, isLoggedIn } = useUser();
    const [isLoadingPostForm, setIsLoadingPostForm] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoadingPostForm(true);
        if (authMode == 'signIn' && email && password) {
            const { accessToken, error } = await signIn({ email, password });
            if (!error && accessToken) {
                mutate();
                console.log(accessToken);
            }
            if (error) {
                setErrorMessage(error);
            }
        }
        else {
            if (authMode === 'signUp' && email && name && password) {
                const { user, error } = await signUp({ email, name, password });
                if (!error && user) {

                    console.log(user);
                }
                if (error) {
                    setErrorMessage(error);
                }
            }
        }
        setIsLoadingPostForm(false);
    };

    const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
        setErrorMessage('');
    };

    const handleName = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
        setErrorMessage('');
    };

    const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
        setErrorMessage('');
    };

    return {
        handleSubmit,
        email,
        handleEmail,
        name,
        handleName,
        password,
        handlePassword,
        errorMessage,
        isLoadingPostForm,
        isLoggedIn,
    };
}