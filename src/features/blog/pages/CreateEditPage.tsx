import { Box, Container } from '@mui/material';
import postApi from 'api/postApi';
import { useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IPost } from 'models';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslateFiles } from 'utils/translation';
import CreateEditForm from '../components/CreateEditForm';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const isNewPost = !postId;

  const { t } = useTranslation('createEditPost');
  const { toast: toastTranslation } = useTranslateFiles('toast');

  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<any>(null);

  useEffect(() => {
    if (isNewPost) return;

    (async () => {
      try {
        const post = await postApi.getForEdit(postId);
        setEditedPost(post);
      } catch (error: any) {
        const errorName = error?.response?.data?.name || 'somethingWrong';
        toast.error(toastTranslation.errors[errorName]);
        navigate('/blog/create', { state: { hideHeaderMenu: true } });
      }
    })();
  }, [postId, navigate]);

  const defaultValues: IPost = isNewPost
    ? {
        title: '',
        content: '',
        thumbnail: '',
        hashtags: [],
        authorId: currentUser?._id as string,
      }
    : editedPost;

  const handleFormSubmit = async (data: IPost) => {
    const savedPost = (isNewPost
      ? await postApi.create(data)
      : await postApi.update(data)) as unknown as IPost;

    navigate(`/blog/post/${savedPost.slug}`);
  };

  return (
    <Container>
      <PageTitle title={isNewPost ? t('pageTitle.create') : t('pageTitle.edit')} />

      <Box>
        <CreateEditForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          isNewPost={isNewPost}
        />
      </Box>
    </Container>
  );
}
