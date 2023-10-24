import { Component } from 'solid-js';
import { userStore } from '../user/userStore';

export const HomeView: Component = () => {
    const { user } = userStore;

    return <div>Welcome {user()?.username}</div>;
};
