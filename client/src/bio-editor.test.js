import BioEditor from './bio-editor.js';
import { render, waitFor, fireEvent, mockAPI} from '@testing-library/react';
import axios from './axios';

test('When no bio is passed to it, an "Add" button is rendered', () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector('button').innerHTML).toContain('add');
});
test('When a bio is passed to it, an "Edit" button is rendered.', () => {
    const { container } = render(<BioEditor bio={'bio text'} />);

    expect(container.querySelector('button').innerHTML).toContain('edit');
});

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered', () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector('button').innerHTML).toContain('add' || 'edit');

    fireEvent.click(container.querySelector('button'));

    expect(container.querySelector('textarea')).toBeTruthy();
});

jest.mock('./axios');
test('Clicking the "Save" button causes an ajax request that calls a propped function', async () => {
   
    const onClick = jest.fn(console.log('hi'));
    axios.post.mockResolvedValue({
        data: {
            success: true
        }
    });

    const { container } = render(<BioEditor updateBio={onClick} />);
    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('textarea')).toBeTruthy();

    fireEvent.click(container.querySelector('button'));

    // expect(container.querySelector('textarea')).toBeTruthy();

    await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));

    expect(onClick).toBeCalledWith(expect.anything());
});
