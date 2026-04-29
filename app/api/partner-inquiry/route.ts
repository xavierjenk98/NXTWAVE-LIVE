import { NextRequest, NextResponse } from 'next/server'
import { validateEmail } from '@/lib/utils'

const PARTNERSHIP_OPTIONS = [
  'Touring Partner',
  'Single Event Sponsor',
  'Brand Activation / Pop-Up',
  'Content / Media Collaboration',
  'Not Sure Yet',
]

export async function POST(req: NextRequest) {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME

  if (!token || !baseId || !tableName) {
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const {
    companyName,
    contactName,
    email,
    phoneNumber,
    partnershipInterest,
    brandMessage,
  } = body as Record<string, string>

  // Server-side validation
  const errors: Record<string, string> = {}

  if (!companyName?.trim()) errors.companyName = 'Company name is required.'
  if (!contactName?.trim()) errors.contactName = 'Contact name is required.'
  if (!email?.trim() || !validateEmail(email)) errors.email = 'Valid email is required.'
  if (!partnershipInterest?.trim() || !PARTNERSHIP_OPTIONS.includes(partnershipInterest)) {
    errors.partnershipInterest = 'Please select a valid partnership interest.'
  }
  if (!brandMessage?.trim()) errors.brandMessage = 'Please tell us about your brand.'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const fields: Record<string, string> = {
    'Company Name': companyName.trim(),
    'Contact Name': contactName.trim(),
    'Email': email.trim(),
    'Partnership Interest': partnershipInterest.trim(),
    'Tell us about your brand and what you\'re looking to do': brandMessage.trim(),
  }
  if (phoneNumber?.trim()) {
    fields['Phone Number'] = phoneNumber.trim()
  }

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!airtableRes.ok) {
    const errBody = await airtableRes.text()
    console.error('Airtable error:', airtableRes.status, errBody)
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
