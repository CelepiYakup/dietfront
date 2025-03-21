const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Meal {
  id: number;
  user_id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_date: string;
  meal_time: string;
  created_at: string;
}

export interface MealInput {
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  meal_date: string;
  meal_time: string;
}

export interface Goal {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  target_value?: number;
  current_value?: number;
  unit?: string;
  category: string;
  start_date: string;
  target_date: string;
  status: 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

// User API calls
export const userApi = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Register new user
  registerUser: async (userData: UserInput): Promise<{ message: string; user: User }> => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  loginUser: async (loginData: LoginInput): Promise<{ message: string; user: User }> => {
    try {
      // For demo purposes, we'll simulate a login since we don't have a real login endpoint yet
      // In a real app, you would make a fetch request to your login endpoint
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get user by email (this is just for demo)
      const users = await userApi.getAllUsers();
      const user = users.find(u => u.email === loginData.email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, you would verify the password on the server
      // Here we're just simulating a successful login
      
      return {
        message: 'Login successful',
        user
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id: number, userData: Partial<UserInput>): Promise<{ message: string; user: User }> => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

// Meal API calls
export const mealApi = {
  // Get all meals for a user
  getUserMeals: async (userId: number): Promise<Meal[]> => {
    try {
      const response = await fetch(`${API_URL}/meals/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  },

  // Get meal by ID
  getMealById: async (id: number): Promise<Meal> => {
    try {
      const response = await fetch(`${API_URL}/meals/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meal');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching meal:', error);
      throw error;
    }
  },

  // Create a new meal
  createMeal: async (userId: number, mealData: MealInput): Promise<{ message: string; meal: Meal }> => {
    try {
      const response = await fetch(`${API_URL}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          ...mealData
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create meal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  },

  // Update meal
  updateMeal: async (id: number, mealData: Partial<MealInput>): Promise<{ message: string; meal: Meal }> => {
    try {
      const response = await fetch(`${API_URL}/meals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update meal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  },

  // Delete meal
  deleteMeal: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_URL}/meals/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete meal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  },
};

export const goalApi = {
  // Create a new goal
  createGoal: async (goalData: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> => {
    const response = await fetch('/api/goals/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      throw new Error('Failed to create goal');
    }

    return response.json();
  },

  // Get all goals for a user
  getUserGoals: async (userId: number): Promise<Goal[]> => {
    const response = await fetch(`/api/goals/goals/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user goals');
    }

    return response.json();
  },

  // Get a specific goal by ID
  getGoalById: async (goalId: number): Promise<Goal> => {
    const response = await fetch(`/api/goals/goals/${goalId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch goal');
    }

    return response.json();
  },

  // Update a goal
  updateGoal: async (goalId: number, goalData: Partial<Omit<Goal, 'id' | 'created_at' | 'updated_at'>>): Promise<Goal> => {
    const response = await fetch(`/api/goals/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    return response.json();
  },

  // Delete a goal
  deleteGoal: async (goalId: number): Promise<void> => {
    const response = await fetch(`/api/goals/goals/${goalId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }
  },

  // Get goals by category for a user
  getGoalsByCategory: async (userId: number, category: string): Promise<Goal[]> => {
    const response = await fetch(`/api/goals/goals/user/${userId}/category/${category}`);

    if (!response.ok) {
      throw new Error('Failed to fetch goals by category');
    }

    return response.json();
  },

  // Get active goals for a user
  getActiveGoals: async (userId: number): Promise<Goal[]> => {
    const response = await fetch(`/api/goals/goals/user/${userId}/active`);

    if (!response.ok) {
      throw new Error('Failed to fetch active goals');
    }

    return response.json();
  },
}; 