import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';

// Pages
import Login from '../../pages/Login';
import Overview from '../../pages/Overview';
import Products from '../../pages/Products';
import ProductForm from '../../pages/ProductForm';
import Categories from '../../pages/Categories';
import CategoryForm from '../../pages/CategoryForm';
import Inventory from '../../pages/Inventory';
import RecordStock from '../../pages/RecordStock';
import Orders from '../../pages/Orders';
import Transactions from '../../pages/Transactions';
import Payments from '../../pages/Payments';
import Customers from '../../pages/Customers';
import CustomerForm from '../../pages/CustomerForm';
import Staff from '../../pages/Staff';
import StaffForm from '../../pages/StaffForm';
import Settings from '../../pages/Settings';

export const router = createBrowserRouter([
  // Public Auth Route
  {
    path: '/login',
    element: <Login />
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/overview" replace />
          },
          {
            path: '/overview',
            element: <Overview />
          },
          {
            path: '/home',
            element: <Navigate to="/overview" replace />
          },

          // Products
          {
            path: '/products',
            element: <Products />
          },
          {
            path: '/products/new',
            element: <ProductForm />
          },
          {
            path: '/products/:id/edit',
            element: <ProductForm />
          },

          // Categories
          {
            path: '/categories',
            element: <Categories />
          },
          {
            path: '/categories/new',
            element: <CategoryForm />
          },
          {
            path: '/categories/:id/edit',
            element: <CategoryForm />
          },

          // Inventory & Stock
          {
            path: '/inventory',
            element: <Inventory />
          },
          {
            path: '/inventory/record-stock',
            element: <RecordStock />
          },

          // Orders
          {
            path: '/orders',
            element: <Orders />
          },
          {
            path: '/orders/:id',
            element: <Orders />
          },

          // Transactions
          {
            path: '/transactions',
            element: <Transactions />
          },

          // Payments
          {
            path: '/payments',
            element: <Payments />
          },

          // Customers
          {
            path: '/customers',
            element: <Customers />
          },
          {
            path: '/customers/new',
            element: <CustomerForm />
          },
          {
            path: '/customers/:id',
            element: <Customers />
          },

          // Staff
          {
            path: '/staff',
            element: <Staff />
          },
          {
            path: '/staff/new',
            element: <StaffForm />
          },
          {
            path: '/staff/:id/edit',
            element: <StaffForm />
          },

          // Settings
          {
            path: '/settings',
            element: <Settings />
          }
        ]
      }
    ]
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/overview" replace />
  }
]);

export default router;
