import { useState, FormEvent } from 'react';

import Loader from './Loader';
import Post from './Post';

import { useCreatePostMutation, useEditPostMutation } from '../../services/posts';

import { Post as PostModel } from '../../models/Post';

function PostForm(props: Partial<PostModel & { id: number }>) {
  const userId = 1;
  const isCreateForm: boolean = props.id == null;

  const [createPost, {
    isLoading: isCreatingPost,
    isError: isCreatePostError,
    isSuccess: isCreatePostSuccess,
    data: createPostResult,
    error: createPostError,
  }] = useCreatePostMutation();

  const [editPost, {
    isLoading: isUpdatingPost,
    isError: isUpdatePostError,
    isSuccess: isUpdatePostSuccess,
    data: updatePostResult,
    error: updatePostError,
  }] = useEditPostMutation();

  const [title, setTitle] = useState(props.title || '');
  const [body, setBody] = useState(props.body || '');

  const onSubmit = (event: FormEvent) => {
    const payload = { userId, title, body };

    event.preventDefault();

    isCreateForm
      ? createPost(payload)
      : editPost({ ...{ id: props.id! }, ...payload });
  };

  return (
    <section className="p-6 bg-white rounded-md">
      {(isCreatingPost || isUpdatingPost) && <Loader label={isCreateForm ? "Posting..." : "Updating..."} />}
      {(isCreatePostError || isUpdatePostError) && <span>{JSON.stringify(isCreateForm ? createPostError : updatePostError)}</span>}
      {(isCreatePostSuccess || isUpdatePostSuccess) && (
        <>
          <div className="flex justify-center">
            <span className="text-lg font-bold">Post {isCreateForm ? "Created" : "Updated"}</span>
          </div>
          <Post {...(isCreateForm ? createPostResult : updatePostResult)} />
        </>
      )}
      {
        (!isCreatingPost && !isCreatePostError && !isCreatePostSuccess) &&
          (!isUpdatingPost && !isUpdatePostError && !isUpdatePostSuccess)
          ? (
            <form onSubmit={onSubmit}>
              <div className="relative my-4">
                <label htmlFor="title" className="text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <label className="my-4 text-gray-700" htmlFor="name">
                Body
                <textarea
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="body"
                  placeholder="Enter post body"
                  name="body"
                  rows={5}
                  cols={40}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
              </label>
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          ) : null}
    </section>
  );
}

export default PostForm;
