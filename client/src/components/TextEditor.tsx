// import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import {} from 'react-icons';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextEditor({
  value = '',
  onChange,
  className,
}: TextEditorProps) {
  function isQuillEmpty(value: string) {
    if (
      value.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
      !value.includes('<img')
    ) {
      return true;
    }
    return false;
  }

  const handleOnChange = (value: string) => {
    isQuillEmpty(value) ? onChange('') : onChange(value);
  };

  return (
    <>
      <ReactQuill
        className={className}
        theme="snow"
        value={value}
        onChange={handleOnChange}
        modules={TextEditor.modules}
      />
    </>
  );
}

TextEditor.modules = {
  toolbar: [
    [{ header: '1' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

TextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];
