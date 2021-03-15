import BioEditor from './bio-editor.js';
import { render, waitsFor, runs, fireEvent, mockAPI } from '@testing-library/react';
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
    const onClick = jest.fn(() => <div>bio</div>);

    const { container } = render(<BioEditor updateBio={onClick} />);
    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('textarea')).toBeTruthy();

    fireEvent.click(container.querySelector('button'));

    // expect(container.querySelector('textarea')).toBeTruthy();

    axios.post.mockResolvedValue({
        data: {
            success: true
        }
    });

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    waitFor(() => {
        expect(onClick.mock.calls.length).toBe(1);
    });
    expect(container.querySelector('textarea')).toBeFalsy();
});
