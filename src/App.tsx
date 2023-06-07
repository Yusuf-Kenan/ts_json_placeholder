import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { Container } from "react-bootstrap";
import MainPage from "./pages/main-page";
import PlaceHolderPage from "./pages/placeholder-page";
import UserDetailPage from "./pages/user-detail-page";
import AboutUsPage from "./pages/about-us-page";
import AlbumsDetailPage from "./pages/albums-detail-page";
import PostDetailPage from "./pages/post-detail-page";

/*
URL ADRESSES:
  /placeholder/users/userId/
  /placeholder/users/userId/albums/albumId
  /placeholder/users/userId/posts/postId

  */
function App() {
  return (
    <>
      <BrowserRouter>
        <Container className="my-3">
          <Header />
          <Routes>
            <Route index element={<MainPage />} />

            <Route path="placeholder">
              <Route index element={<PlaceHolderPage />} />

              <Route path="user/:userId">
                <Route index element={<UserDetailPage />} />

                <Route path="albums/:albumId" element={<AlbumsDetailPage />} />

                <Route path="posts/:postId" element={<PostDetailPage />} />
              </Route>
            </Route>
            <Route path="aboutus" element={<AboutUsPage />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
