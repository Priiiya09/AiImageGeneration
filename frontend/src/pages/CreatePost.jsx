import React, { useState } from "react";
import styled from "styled-components";
import GenerateFormImage from "../components/GenerateFormImage";
import GenerateImageCard from "../components/GenerateImageCard";
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
  justify-content: center;
`;
const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 1200px;
  gap: 8%;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <Container>
      <Wrapper>
        <GenerateFormImage
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          generateImageLoading={generateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          setGenerateImageLoading={setGenerateImageLoading}
        />
        <GenerateImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
