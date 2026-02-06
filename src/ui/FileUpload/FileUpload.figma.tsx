import FileUpload from './FileUpload';
import { code } from '@figma/code-connect';

export default code.connect(
    FileUpload,
    'https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components',
    {
        props: {
            instructionText: code.string('instructionText'),
            acceptText: code.string('acceptText'),
            maxSize: code.number('maxSize'),
            accept: code.array('accept'),
            multiple: code.boolean('multiple'),
            disabled: code.boolean('disabled'),
        },
        example: ({ instructionText, acceptText, maxSize, accept, multiple, disabled }) => (
            <FileUpload
                instructionText={instructionText}
                acceptText={acceptText}
                maxSize={maxSize}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onFileSelect={(files) => console.log('Files selected:', files)}
            />
        ),
    }
);
