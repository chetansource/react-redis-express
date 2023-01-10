import express from 'express'
import { connectDataBase } from './database.js'

const app = express()
connectDataBase()
