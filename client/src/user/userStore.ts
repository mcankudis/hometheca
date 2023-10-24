import { UserData } from '@hometheca/shared';
import { createRoot, createSignal } from 'solid-js';

function createUserStore() {
    const [user, setUser] = createSignal<UserData | undefined>(undefined);

    return { user, setUser };
}

export const userStore = createRoot(createUserStore);
