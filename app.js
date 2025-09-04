import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
} from "@mui/material";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    try {
      setError("");
      setShortUrl("");

      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl,
        customAlias,
      });

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        🚀 URL Shortener
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <TextField
          label="Custom Alias (optional)"
          variant="outlined"
          fullWidth
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleShorten}>
          Shorten URL
        </Button>
      </Box>

      {shortUrl && (
        <Box mt={3}>
          <Alert severity="success">
            Short URL:{" "}
            <Link href={shortUrl} target="_blank" rel="noopener">
              {shortUrl}
            </Link>
          </Alert>
        </Box>
      )}

      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Container>
  );
}

export default App;
