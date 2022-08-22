import React from 'react';
import { IWord } from 'libs/types/types';

export const WordMoreInfo = ({ rowData }: { rowData: IWord }): JSX.Element => {
    return (
        <>
            <h2>Engish word:</h2>
            <h3>{rowData.word}</h3>

            {rowData.transcription &&
                <>
                    <h2>Transcription:</h2>
                    <h3>{rowData.transcription}</h3>
                </>
            }

            {rowData.definitions && !!rowData.definitions?.length &&
                <>
                    <h2>Definitions:</h2>
                    {rowData.definitions.map((definition, index) => {
                        return <h3 key={definition + index}>{definition}</h3>
                    })}
                </>
            }
            {rowData.translations && !!rowData.translations?.length &&
                <>
                    <h2>Translations:</h2>
                    {rowData.translations.map((translation, index) => {
                        return <h3 key={translation + index}>{translation}</h3>
                    })}
                </>
            }
            {rowData.usageExamples && !!rowData.usageExamples?.length &&
                <>
                    <h2>Usage examples:</h2>
                    {rowData.usageExamples.map((usageExample, index) => {
                        return (<>
                            <h3 key={usageExample.sentence + index}>{usageExample.sentence}</h3>
                            {usageExample.translation &&
                                <h3 key={usageExample.translation + index}>{usageExample.translation}</h3>
                            }
                        </>)
                    })}
                </>
            }
        </>
    );
}