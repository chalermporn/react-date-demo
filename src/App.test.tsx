import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders all date picker sections', () => {
    render(<App />)
    
    expect(screen.getByText('1. เลือกเดือน (Month Picker)')).toBeInTheDocument()
    expect(screen.getByText('2. กำหนดขั้นต่ำ (Min Date)')).toBeInTheDocument()
    expect(screen.getByText('3. กำหนดช่วง (Range Limit)')).toBeInTheDocument()
  })

  it('renders month picker with current month', () => {
    render(<App />)
    
    // Month picker shows current month in Thai Buddhist Era format
    expect(screen.getByText(/มกราคม 2569/)).toBeInTheDocument()
  })

  it('renders date picker buttons', () => {
    render(<App />)
    
    const datePickers = screen.getAllByText('เลือกวันที่')
    expect(datePickers).toHaveLength(2)
  })

  it('opens month picker popup when clicked', () => {
    render(<App />)
    
    const monthPickerButton = screen.getByText(/มกราคม 2569/)
    fireEvent.click(monthPickerButton)
    
    // Should show month names in Thai
    expect(screen.getByText('ม.ค.')).toBeInTheDocument()
    expect(screen.getByText('ก.พ.')).toBeInTheDocument()
  })

  it('opens date picker popup when clicked', () => {
    render(<App />)
    
    const datePickerButtons = screen.getAllByText('เลือกวันที่')
    fireEvent.click(datePickerButtons[0])
    
    // Should show weekday headers in Thai
    expect(screen.getByText('อา')).toBeInTheDocument()
    expect(screen.getByText('จ')).toBeInTheDocument()
  })

  it('renders labels for date pickers', () => {
    render(<App />)
    
    expect(screen.getByText('วันที่เริ่มงาน')).toBeInTheDocument()
    expect(screen.getByText('วันที่นัดหมาย')).toBeInTheDocument()
  })
})