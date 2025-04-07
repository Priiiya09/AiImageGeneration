import React from "react";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./Textinput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateAIImage } from "../api";
const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  gap: 10px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.span`
  flex: 1;
  display: flex;
  gap: 8px;
`;
const Special = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const GenerateFormImage = ({
  post,
  setPost,
  createPostLoading,
  generateImageLoading,
  setCreatePostLoading,
  setGenerateImageLoading,
}) => {
    const generateImageFun=async ()=>{
        setGenerateImageLoading(true);
        await GenerateAIImage({prompt:post.prompt}).then((res)=>{
          setPost({...post,photo:`data:image/jpge;base64,${res?.data?.photo}`})
          setGenerateImageLoading(false);
        }).catch((err)=>{
          console.log(err);
        })
    }
    const createPostFun=()=>{
        setCreatePostLoading(true);
    }
  return (
    <Form>
      <Top>
        <Title>
          <Special>Generate Image</Special> with Prompt{" "}
        </Title>
        <Desc>Write your prompt according to the Image you want !</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your Name  . . ."
          name="name"
          value={post.name}
          handelChange={(e)=>setPost({...post,name:e.target.value})}
        />
        <TextInput
          label="Prompt"
          placeholder="Enter details about the image you want me to generate..."
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e)=>setPost({...post,prompt:e.target.value})}
        />
        **You can also post the image you are going to generate**
      </Body>
      <Actions>
        <Button text="Generate Image" flex leftIcon={<AutoAwesome />} 
        isLoading={generateImageLoading}
        isDisabled={post.prompt=="" }
        onClick={()=>generateImageFun()}
        />
        <Button
          text="Post Image" 
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
        isDisabled={post.name=="" || post.prompt=="" || post.photo==""}
        onClick={()=>createPostFun()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateFormImage;
