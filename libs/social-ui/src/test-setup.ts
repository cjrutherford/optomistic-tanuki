import 'jest-preset-angular/setup-jest';
jest.mock('quill', () => {
    return class QuillMock {
      static register() {}
      constructor() {}
      getSelection() {
        return { index: 0 };
      }
      insertEmbed() {}
      clipboard = {
        dangerouslyPasteHTML: jest.fn(),
      };
    };
  });
  
  jest.mock('quill-magic-url', () => jest.fn());
  jest.mock('quill-image-compress', () => jest.fn());
  jest.mock('quill-cursors', () => jest.fn());
  jest.mock('quill-placeholder-module', () => jest.fn());