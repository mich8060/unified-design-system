import Tooltip from './Tooltip';
import { code } from '@figma/code-connect';

export default code.connect(
    Tooltip,
    'https://www.figma.com/design/LkIyThUA0oVNsDEAyOF7ER/Design-System--Components',
    {
        props: {
            content: code.string('A message which appears when a cursor is positioned over an icon, image, hyperlink, or other element in a graphical user interface.'),
            placement: code.enum('placement', {
                top: 'top',
                bottom: 'bottom',
                left: 'left',
                right: 'right',
            }),
            disabled: code.boolean('disabled'),
        },
        example: ({ content, placement, disabled }) => (
            <Tooltip content={content} placement={placement} disabled={disabled}>
                <button>Hover me</button>
            </Tooltip>
        ),
    }
);
