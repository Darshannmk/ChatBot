import axios from 'axios';

export const recognizeImage = async (imageData: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://gemini-api-url.com/v1/images:annotate',
      {
        requests: [
          {
            image: {
              content: imageData,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `AIzaSyALvQMVVLm4GIehLON57bEOwnwB_OYBLlQ`,
          'Content-Type': 'application/json',
        },
      }
    );

    const annotations = response.data.responses[0].labelAnnotations;
    if (annotations && annotations.length > 0) {
      return annotations
        .map((annotation: any) => annotation.description)
        .join(', ');
    } else {
      return 'No recognizable objects found in the image.';
    }
  } catch (error) {
    console.error('Error recognizing image:', error);
    return 'An error occurred while recognizing the image.';
  }
};
