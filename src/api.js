const fetchGitHubResults = async (query) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.mercy-preview+json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("GitHub: Please wait a few minutes before you try again");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw { gitError: error.message };
  }
};

const fetchYouTubeResults = async (query) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(
        "YouTube: Please wait a few minutes before you try again"
      );
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw { youError: error.message };
  }
};

const fetchGoogleResults = async (query) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_GOOGLE_CX;
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`
    );
    if (!response.ok) {
      throw new Error("Google: Please wait a few minutes before you try again");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw { gogError: error.message };
  }
};

export { fetchGitHubResults, fetchYouTubeResults, fetchGoogleResults };
